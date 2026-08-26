import "./ChapterDivider.css";

interface Props {
  num: string;
  label: string;
  id: string;
  lede?: string;
}

/** Breathing room between major case-study chapters. */
export function ChapterDivider({ num, label, id, lede }: Props) {
  return (
    <div className="chapter" id={id}>
      <div className="wrap chapter__inner">
        <span className="chapter__num">{num}</span>
        <h2 className="chapter__label">{label}</h2>
        {lede && <p className="chapter__lede">{lede}</p>}
      </div>
    </div>
  );
}
