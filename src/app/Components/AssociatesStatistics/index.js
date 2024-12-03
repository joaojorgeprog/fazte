import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";

export default function AssociatesStatistics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* Card 1 */}
      <div className="flex items-center shadow-md rounded-lg p-4">
        <div className="p-3 bg-blue-400 rounded-full">
          <FaUsers size={50} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">Total de Sócios</p>
          <h1 className="text-xl font-bold">5,423</h1>
          <div className="flex items-center mt-1">
            <IoMdArrowRoundUp className="text-green-500" />
            <p className="text-green-500 ml-1">16%</p>
            <p className="ml-2 text-sm text-gray-500">este mês</p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex items-center shadow-md rounded-lg p-4">
        <div className="p-3 bg-blue-400 rounded-full">
          <FaUsers size={50} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">Total Receita</p>
          <h1 className="text-xl font-bold">1,893</h1>
          <div className="flex items-center mt-1">
            <IoMdArrowRoundDown className="text-red-500" />
            <p className="text-red-500 ml-1">1%</p>
            <p className="ml-2 text-sm text-gray-500">este ano</p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex items-center shadow-md rounded-lg p-4">
        <div className="p-3 bg-blue-400 rounded-full">
          <FaUsers size={50} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">Total de Utilizadores</p>
          <h1 className="text-xl font-bold">189</h1>
        </div>
      </div>

      {/* Card 4 */}
      <div className="flex items-center shadow-md rounded-lg p-4">
        <div className="p-3 bg-blue-400 rounded-full">
          <FaUsers size={50} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">Total Receita</p>
          <h1 className="text-xl font-bold">1,893</h1>
          <div className="flex items-center mt-1">
            <IoMdArrowRoundDown className="text-red-500" />
            <p className="text-red-500 ml-1">1%</p>
            <p className="ml-2 text-sm text-gray-500">este ano</p>
          </div>
        </div>
      </div>
    </div>
  );
}