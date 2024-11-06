import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnButtonClick = jest.fn();
  const buttonLabel = 'Confirm';

  const renderModal = (isOpen: boolean) => {
    return render(
      <Modal
        isOpen={isOpen}
        onClose={mockOnClose}
        onButtonClick={mockOnButtonClick}
        buttonLabel={buttonLabel}
      >
        <p>Modal Content</p>
      </Modal>
    );
  };

  it('renders correctly when open', () => {
    renderModal(true);

    const modalContent = screen.getByText(/Modal Content/i);
    expect(modalContent).toBeInTheDocument();

    const button = screen.getByRole('button', { name: buttonLabel });
    expect(button).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModal(false);
    const modalContent = screen.queryByText(/Modal Content/i);
    expect(modalContent).not.toBeInTheDocument();
  });

  it('calls onClose when clicking outside the modal content', () => {
    renderModal(true);

    const modalBackdrop = screen.getByRole('dialog');
    fireEvent.click(modalBackdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onButtonClick when the button is clicked', () => {
    renderModal(true);

    const button = screen.getByRole('button', { name: buttonLabel });
    fireEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });
});
