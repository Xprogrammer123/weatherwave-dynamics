import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AdUnit from './AdUnit';

interface PopupAdProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAdClick?: () => void;
}

const PopupAd = ({ open, onOpenChange, onAdClick }: PopupAdProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    } else {
      // Show popup ad after 5 seconds if not controlled
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]" onClick={onAdClick}>
        <AdUnit className="min-h-[250px]" />
      </DialogContent>
    </Dialog>
  );
};

export default PopupAd;