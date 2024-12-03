export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
export const getKeyValue = (item, key) => {
    return item[key]; // Ajuste conforme a estrutura do seu item
  };