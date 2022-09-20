import React from 'react';
import Modal from 'react-responsive-modal';

import XButton from '@/components/Common/XButton';

type ConfirmationDialogProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  onClose?: () => void;
};

const ConfirmationDialog = ({
  children,
  open,
  setOpen,
  title = 'my-modal-title',
  description = 'my-modal-description',
  onClose,
}: ConfirmationDialogProps) => {
  if (!onClose) {
    onClose = () => setOpen(false);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby={title}
      aria-describedby={description}
      classNames={{
        root: 'text-black dark:!text-white',
        modal: 'rounded-xl bg-white dark:!bg-dark p-0',
      }}
      closeIcon={<XButton />}
    >
      {children}
    </Modal>
  );
};

export default ConfirmationDialog;
