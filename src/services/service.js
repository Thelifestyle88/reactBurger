export const sortElement = (array, indexPick, indexDrop) => {
    if (indexPick < indexDrop) {
      return [...array.slice(0, indexPick), ...array(indexPick+1, indexDrop), array[indexPick], ...array(indexDrop+1, array.length)] 
    } else if (indexPick > indexDrop) {
     return [...array.slice(0, indexDrop), array[indexPick], ...array(indexPick+1, indexDrop),  array(indexDrop+1, array.length)]; 
    }
    return array;
}