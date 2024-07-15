import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Onboarding from "../forms/Onboarding";

export function DrawerDialog() {
 
  //   const isDesktop = useMediaQuery("(min-width: 768px)");

  //   if (isDesktop) {
  //     return (
  //       <Dialog open={open} onOpenChange={setOpen}>
  //         <DialogTrigger asChild>
  //           <Button variant="outline">Edit Profile</Button>
  //         </DialogTrigger>
  //         <DialogContent className="sm:max-w-[425px]">
  //           <DialogHeader>
  //             <DialogTitle>Edit profile</DialogTitle>
  //             <DialogDescription>
  //               Make changes to your profile here. Click save when you're done.
  //             </DialogDescription>
  //           </DialogHeader>
  //           <Onboarding />
  //         </DialogContent>
  //       </Dialog>
  //     );
  //   }

  return (
    <section className="flex justify-center items-center">
      
    </section>
  );
}
