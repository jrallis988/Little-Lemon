import { describe, expect, it } from 'vitest';
import { AI_EMPLOYEES, getEmployeeBySlug } from '@/data/employees';

describe('AI employees catalog', () => {
  it('includes the nine Working Intelligence agents', () => {
    expect(AI_EMPLOYEES).toHaveLength(9);
    expect(AI_EMPLOYEES.map((employee) => employee.slug)).toEqual([
      'nate',
      'isa',
      'calvin',
      'kate',
      'holly',
      'mia',
      'david',
      'robert',
      'missy',
    ]);
  });

  it('maps each agent to the updated role titles', () => {
    expect(getEmployeeBySlug('nate')?.jobTitle).toBe('Manager');
    expect(getEmployeeBySlug('isa')?.jobTitle).toBe('Assistant Manager');
    expect(getEmployeeBySlug('calvin')?.jobTitle).toBe('Human Resources Manager');
    expect(getEmployeeBySlug('kate')?.jobTitle).toBe('Job Recruiter');
    expect(getEmployeeBySlug('holly')?.jobTitle).toBe('Marketing Director');
    expect(getEmployeeBySlug('mia')?.jobTitle).toBe('Payroll Manager');
    expect(getEmployeeBySlug('david')?.jobTitle).toBe('IT');
    expect(getEmployeeBySlug('robert')?.jobTitle).toBe('Administrative Assistant');
    expect(getEmployeeBySlug('missy')?.jobTitle).toBe('Customer Service');
  });

  it('gives every agent job boundaries and necessity examples', () => {
    for (const employee of AI_EMPLOYEES) {
      expect(employee.systemPrompt.length).toBeGreaterThan(40);
      expect(employee.jobBoundary.mayDo.length).toBeGreaterThan(0);
      expect(employee.jobBoundary.mayNotDo.length).toBeGreaterThan(0);
      expect(employee.humanNecessityExamples.length).toBeGreaterThan(0);
      expect(employee.autonomyLevel).toBeGreaterThanOrEqual(1);
      expect(employee.avatar.imageUrl).toBeTruthy();
    }
  });
});
