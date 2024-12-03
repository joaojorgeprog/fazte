import React, { useEffect, useCallback } from "react";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "../../icons/SearchIcon";


export default function TextInput({label, isClearable, size, value, variant, onClear, onValueChange}) {
    return (
        <Input
          label={label || "..."}
          isClearable={isClearable}
          classNames={{
            base: "w-full md:w-1/2",
            inputWrapper: "border-1",
          }}
          size={size}
          startContent={<SearchIcon className="text-default-300" />}
          value={value}
          variant={variant}
          onClear={onClear}
          onValueChange={onValueChange}
        />
    )
}