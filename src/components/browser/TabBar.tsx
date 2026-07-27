import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { browserCloseTab, isTauriRuntime } from "@/services/browserBridge";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { useBrowserStore } from "@/stores/browserStore";
import { cn } from "@/lib/utils";
import type { BrowserTab } from "@/types";

export function TabBar() {
  const tabs = useBrowserStore((state) => state.tabs);
  const activeTabId = useBrowserStore((state) => state.activeTabId);
  const switchTab = useBrowserStore((state) => state.switchTab);
  const closeTab = useBrowserStore((state) => state.closeTab);
  const reorderTabs = useBrowserStore((state) => state.reorderTabs);
  const { openNewTab } = useBrowserActions();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = tabs.map((tab) => tab.id);
    const activeIndex = ids.indexOf(String(active.id));
    const overIndex = ids.indexOf(String(over.id));
    if (activeIndex === -1 || overIndex === -1) return;

    const next = [...ids];
    const [moved] = next.splice(activeIndex, 1);
    if (!moved) return;
    next.splice(overIndex, 0, moved);
    reorderTabs(next);
  };

  return (
    <div className="flex items-center gap-2 border-b border-white/60 px-2 pt-2">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={tabs.map((tab) => tab.id)} strategy={horizontalListSortingStrategy}>
          <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <SortableTab
                key={tab.id}
                tab={tab}
                active={tab.id === activeTabId}
                onSelect={() => switchTab(tab.id)}
                onClose={() => {
                  if (tab.nativeAttached && isTauriRuntime()) {
                    void browserCloseTab(tab.id);
                  }
                  closeTab(tab.id);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        variant="ghost"
        size="icon"
        className="mb-1 shrink-0 rounded-2xl"
        aria-label="New tab"
        onClick={openNewTab}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

function SortableTab({
  tab,
  active,
  onSelect,
  onClose,
}: {
  tab: BrowserTab;
  active: boolean;
  onSelect: () => void;
  onClose: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: tab.id,
    disabled: tab.pinned,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group mb-1 flex min-w-44 max-w-64 items-center gap-2 rounded-t-2xl border px-3 py-2 text-sm transition",
        active
          ? "border-white bg-white text-navy shadow-soft"
          : "border-white/50 bg-white/45 text-slate hover:bg-white/75",
        tab.pinned && "min-w-32",
      )}
    >
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
        onClick={onSelect}
      >
        {tab.favicon ? (
          <img src={tab.favicon} alt="" className="h-4 w-4 shrink-0 rounded-sm" />
        ) : (
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ocean" aria-hidden />
        )}
        <span className="truncate font-medium">{tab.title}</span>
      </button>
      <button
        type="button"
        className="cursor-grab text-slate opacity-0 transition group-hover:opacity-100"
        aria-label={`Drag ${tab.title}`}
        {...attributes}
        {...listeners}
      >
        <Grip className="h-3.5 w-3.5" />
      </button>
      {!tab.pinned && (
        <button
          type="button"
          className="rounded-full p-1 text-slate hover:bg-cream hover:text-destructive"
          aria-label={`Close ${tab.title}`}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
