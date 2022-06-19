import React from 'react';
import Modal from 'react-responsive-modal';

import XButton from '@/components/Common/XButton';

type ConfirmationDialogProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
};

const ConfirmationDialog = ({
  children,
  open,
  setOpen,
  title = 'my-modal-title',
  description = 'my-modal-description',
}: ConfirmationDialogProps) => {
  const onCloseModal = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      aria-labelledby={title}
      aria-describedby={description}
      classNames={{
        root: 'text-black dark:text-white',
        modal: 'rounded-xl bg-white dark:bg-dark',
      }}
      closeIcon={<XButton />}
    >
      {children}
    </Modal>
  );
};

export default ConfirmationDialog;
