import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


type Item = {
  id: string;
  name: string;
};

const initialItems: Item[] = [
  { id: "item-1", name: "Item 1" },
  { id: "item-2", name: "Item 2" },
  { id: "item-3", name: "Item 3" },
];

export default function Timetable() {
  const [showTable, setShowTable] = useState(false);
  const [listA, setListA] = useState<Item[]>(initialItems);
  const [timetable, setTimetable] = useState<(Item | null)[][]>(
    Array(4).fill(null).map(() => Array(5).fill(null))
  );

  const handleCreateClick = () => {
    setShowTable(true);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
  
    // Prevent dragging from timetable cells
    if (source.droppableId.startsWith("cell-")) return;
  
    // Allow placing a copy of ListA item into a cell
    if (source.droppableId === "listA" && destination.droppableId.startsWith("cell-")) {
      const item = listA[source.index];
      const [_, rowStr, colStr] = destination.droppableId.split("-");
      const row = parseInt(rowStr);
      const col = parseInt(colStr);
  
    //   if (timetable[row][col]) return; // Prevent overwrite
  
      const newTimetable = [...timetable];
       newTimetable[row] = [...newTimetable[row]];
      newTimetable[row][col] = {
        ...item,
        id: `${item.id}-${row}-${col}` // generate unique id per drop
      };
  
      setTimetable(newTimetable);
    }
  };
  
  
  const timeSlots = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end gap-4 mb-6">
        <Button
          onClick={handleCreateClick}
          className="h-12 px-6 bg-white text-sky-700 text-base font-medium shadow-md"
        >
          Create New Timetable
        </Button>
        <Button className="h-12 px-6 bg-white text-sky-700 text-base font-medium shadow-md">
          Previous Records
        </Button>
      </div>

      {showTable ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="overflow-x-auto border-2 border-grey-100 px-10 py-2 bg-[white]">
              <div className="flex justify-start gap-4 mb-6 bg-sky-700 h-12 py-5 justify-start mt-5">
                <p className='mt-[-8px] text-[18px] text-[white]'>Time table</p>
                <div className="flex absolute flex-wrap justify-end gap-4 mt-4 border border-sky-700 px-2 py-3 w-[300px] bg-[white] mt-[-60px]"></div>
              </div>

              <table className="min-w-full mt-[-10px] table-auto border-collapse border border-gray-300 bg-[white] shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 border border-gray-300">Time</th>
                    {days.map((day) => (
                      <th key={day} className="px-4 py-3 border border-gray-300">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, rowIdx) => (
                    <tr key={rowIdx} className="text-center text-[black]">
                      <td className="px-4 py-3 border border-gray-300 font-medium">{slot}</td>
                      {days.map((_, colIdx) => (
                        <td key={colIdx} className="px-4 py-3 border border-gray-300">
                          <Droppable droppableId={`cell-${rowIdx}-${colIdx}`}>
                            {(provided) => (
                              <div
                                className="min-h-[50px]"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {timetable[rowIdx][colIdx] && (
                                  <Draggable
                                    draggableId={timetable[rowIdx][colIdx]!.id}
                                    index={0}
                                  >
                                    {(provided) => (
                                      <div
                                        className="p-1 bg-white rounded shadow text-center mb-1"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        {timetable[rowIdx][colIdx]!.name}
                                      </div>
                                    )}
                                  </Draggable>
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-10">
                <Button className="text-3xl bg-sky-700 text-[white] rounded-full w-14 h-14 shadow-lg hover:bg-purple-800">
                  +
                </Button>
              </div>

              {/* Subject list area */}
              <Droppable droppableId="listA">
                {(provided) => (
                  <div
                    className="w-100 bg-blue-100 p-2 rounded flex "
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* <h3 className="text-center font-semibold">List A</h3> */}
                    {listA.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className=" p-2 bg-white mx-2 rounded shadow text-center w-40 "
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-40 border-5 border-sky-700 rounded-xl py-5 w-200 ml-30">
          No timetable created yet. Click "Create New Timetable" to get started.
        <h1>
        <FontAwesomeIcon icon={faArrowUp} className="text-sky-700 text-4xl" /></h1>  


        </div>
      )}
    </div>
  );
}
