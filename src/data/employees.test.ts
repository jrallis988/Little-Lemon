import { describe, expect, it } from 'vitest';
import { AI_EMPLOYEES, getEmployeeBySlug } from '@/data/employees';

describe('AI employees catalog', () => {
  it('includes the eight core employees', () => {
    expect(AI_EMPLOYEES).toHaveLength(8);
    expect(AI_EMPLOYEES.map((employee) => employee.slug)).toEqual([
      'calvin',
      'holly',
      'sonny',
      'penny',
      'walter',
      'linda',
      'stan',
      'rachel',
    ]);
  });

  it('resolves employees by slug', () => {
    expect(getEmployeeBySlug('walter')?.jobTitle).toBe('Website Developer');
  });

  it('provides extensible employee metadata', () => {
    for (const employee of AI_EMPLOYEES) {
      expect(employee.systemPrompt.length).toBeGreaterThan(40);
      expect(employee.responsibilities.length).toBeGreaterThan(0);
      expect(employee.tools.length).toBeGreaterThan(0);
      expect(employee.guidelines.length).toBeGreaterThan(0);
    }
  });
});
