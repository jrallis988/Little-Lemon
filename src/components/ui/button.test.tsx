import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Open workspace</Button>);
    expect(screen.getByRole('button', { name: 'Open workspace' })).toBeInTheDocument();
  });
});
