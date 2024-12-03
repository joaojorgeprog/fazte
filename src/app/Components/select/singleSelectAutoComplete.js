import React, { useEffect, useCallback } from "react";
import {Select, SelectItem, Autocomplete, AutocompleteItem} from "@nextui-org/react";

export default function MultiSelect({label, placeholder, selectedKeys, className, onSelectionChange, size, isLoading, options }) {
    return (
        <Autocomplete
            label={label || '...'}
            selectionMode="multiple"
            placeholder={placeholder}
            selectedKeys={selectedKeys}
            className={className}
            onSelectionChange={onSelectionChange}
            size={size}
            isLoading={isLoading}
        >
            {options.map((ob) => (
                <AutocompleteItem key={ob.key}>
                    {ob.label}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}