function ExpandablePanel({ header, children }) {
  return(
    <div className='mb-2 border rounded'>
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flexrow items-center jutiy-between">
          {header}
        </div>
      </div>
      <div className="p-2 border-t">
        {children}
      </div>
    </div>
  );
};

export default ExpandablePanel;
