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

    if (source.droppableId.startsWith("cell-")) return;

    if (source.droppableId === "listA" && destination.droppableId.startsWith("cell-")) {
      const item = listA[source.index];
      const [_, rowStr, colStr] = destination.droppableId.split("-");
      const row = parseInt(rowStr);
      const col = parseInt(colStr);

      const newTimetable = [...timetable];
      newTimetable[row] = [...newTimetable[row]];
      newTimetable[row][col] = {
        ...item,
        id: `${item.id}-${row}-${col}`
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
const handleClick1=()=>{
  window.print();
}
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-end gap-4 mb-8">
        <Button
          onClick={handleCreateClick}
          className="h-12 px-6 bg-white text-sky-700 text-base font-semibold border border-sky-700 hover:bg-sky-50"
        >
          Create New Timetable
        </Button>

        <Button
          onClick={handleClick1}
          className="h-12 px-6 bg-white text-sky-700 text-base font-semibold border border-sky-700 hover:bg-sky-50"
        >
        print
        </Button>
        <Button className="h-12 px-6 bg-white text-sky-700 text-base font-semibold border border-sky-700 hover:bg-sky-50">
          Previous Records
        </Button>
      </div>

      {showTable ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow bg-white px-6 py-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-sky-700">Timetable</h2>
            </div>

            <table className="w-full border-collapse table-fixed">
              <thead className="bg-sky-50">
                <tr>
                  <th className="w-1/6 px-4 py-3 border border-gray-300 text-left text-sm font-medium">Time</th>
                  {days.map((day) => (
                    <th key={day} className="px-4 py-3 border border-gray-300 text-sm font-medium">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, rowIdx) => (
                  <tr key={rowIdx} className="text-center">
                    <td className="px-4 py-3 border border-gray-300 font-medium bg-sky-50 text-sm">{slot}</td>
                    {days.map((_, colIdx) => (
                      <td key={colIdx} className="px-2 py-2 border border-gray-300">
                        <Droppable droppableId={`cell-${rowIdx}-${colIdx}`}>
                          {(provided) => (
                            <div
                              className="min-h-[50px] flex items-center justify-center"
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
                                      className="p-2 bg-sky-100 rounded-md shadow text-sm text-sky-900 font-medium w-full text-center"
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
              <Button className="text-3xl bg-sky-700 text-white rounded-full w-14 h-14 shadow-md hover:bg-sky-800">
                +
              </Button>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-2 text-sky-700">Available Subjects</h3>
              <Droppable droppableId="listA">
                {(provided) => (
                  <div
                    className="flex flex-wrap gap-4 bg-sky-50 p-4 rounded-lg border border-sky-200"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {listA.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="p-3 bg-white rounded shadow-md w-40 text-center text-sm font-medium text-gray-700"
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
          </div>
        </DragDropContext>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-40 border-2 border-sky-700 rounded-xl py-10 px-6 w-3/4 mx-auto shadow">
          <p>No timetable created yet. Click "Create New Timetable" to get started.</p>
          <FontAwesomeIcon icon={faArrowUp} className="text-sky-700 text-4xl mt-4" />
        </div>
      )}
    </div>
  );
}
