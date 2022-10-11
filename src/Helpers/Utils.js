export function convertName(name) {
    
    const arr = name.replace(/_/g, ' ').split(" ")
    let converted =  arr.map(letter => {
        return  letter.toLowerCase().charAt(0).toUpperCase() + letter.slice(1).toLowerCase()
    }).join(' ')
    
    return converted
   
}