export const hotkeys = {
  Backspace: (context: any) => {
    const activeObject = context.canvas.getActiveObject();
    if (activeObject) {
      context.canvas.remove(activeObject);
      context.canvas.requestRenderAll();
    }
  },
  "Ctrl+c": (context: any, copiedObject: { current: any }) => {
    const activeObject = context.canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone((cloned: any) => {
        copiedObject.current = cloned;
      });
    }
  },
  "Ctrl+v": (
    context: any,
    copiedObject: {
      current: { clone: (arg0: (clonedObj: any) => void) => void };
    }
  ) => {
    if (copiedObject.current) {
      copiedObject.current.clone(
        (clonedObj: {
          set: (arg0: { left: any; top: any }) => void;
          left: number;
          top: number;
        }) => {
          context.canvas.add(clonedObj);
          clonedObj.set({ left: clonedObj.left + 10, top: clonedObj.top + 10 });
          context.canvas.setActiveObject(clonedObj);
          context.canvas.requestRenderAll();
        }
      );
    }
  },
};
