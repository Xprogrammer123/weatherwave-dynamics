import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AdUnit from './AdUnit';

const PopupAd = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup ad after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <AdUnit className="min-h-[250px]" />
      </DialogContent>
    </Dialog>
  );
};

export default PopupAd;