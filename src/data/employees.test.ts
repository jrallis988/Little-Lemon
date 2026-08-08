import { describe, expect, it } from 'vitest';
import { AI_EMPLOYEES, getEmployeeBySlug } from '@/data/employees';

describe('AI employees catalog', () => {
  it('includes the eight Working Intelligence agents', () => {
    expect(AI_EMPLOYEES).toHaveLength(8);
    expect(AI_EMPLOYEES.map((employee) => employee.slug)).toEqual([
      'holly',
      'calvin',
      'kate',
      'isa',
      'missy',
      'walter',
      'penny',
      'rachel',
    ]);
  });

  it('positions Holly as HR workforce intelligence', () => {
    expect(getEmployeeBySlug('holly')?.jobTitle).toBe('HR Workforce Intelligence');
    expect(getEmployeeBySlug('holly')?.connectedSystems).toContain('sys-adp');
  });

  it('gives every agent job boundaries and necessity examples', () => {
    for (const employee of AI_EMPLOYEES) {
      expect(employee.systemPrompt.length).toBeGreaterThan(40);
      expect(employee.jobBoundary.mayDo.length).toBeGreaterThan(0);
      expect(employee.jobBoundary.mayNotDo.length).toBeGreaterThan(0);
      expect(employee.humanNecessityExamples.length).toBeGreaterThan(0);
      expect(employee.autonomyLevel).toBeGreaterThanOrEqual(1);
    }
  });
});
