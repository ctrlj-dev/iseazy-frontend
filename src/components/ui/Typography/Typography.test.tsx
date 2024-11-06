import { render } from '@testing-library/react';
import Typography from './Typography';
import styles from './Typography.module.scss';

describe('Typography Component', () => {
  it('renders with default tag and variant', () => {
    const { getByText } = render(<Typography>Default Heading</Typography>);
    const headingElement = getByText('Default Heading');

    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveClass(styles.typography);
    expect(headingElement).toHaveClass(styles.h1);
  });

  it('renders with a custom tag', () => {
    const { getByText } = render(
      <Typography tag="h2">Custom Heading</Typography>
    );
    const headingElement = getByText('Custom Heading');

    expect(headingElement.tagName).toBe('H2');
    expect(headingElement).toHaveClass(styles.typography);
    expect(headingElement).toHaveClass(styles.h2);
  });

  it('applies the specified variant styles', () => {
    const { getByText } = render(
      <Typography tag="h3" variant="h2">
        Styled as H2
      </Typography>
    );
    const headingElement = getByText('Styled as H2');

    expect(headingElement.tagName).toBe('H3'); // Check if the tag is h3
    expect(headingElement).toHaveClass(styles.typography); // Check for base styles
    expect(headingElement).toHaveClass(styles.h2); // Check for h2 styles applied
  });

  it('supports custom class names', () => {
    const { getByText } = render(
      <Typography tag="p" className="custom-class">
        Custom Class
      </Typography>
    );
    const paragraphElement = getByText('Custom Class');

    expect(paragraphElement).toHaveClass('custom-class');
    expect(paragraphElement.tagName).toBe('P');
  });
});
