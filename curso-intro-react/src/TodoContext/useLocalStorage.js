import React from 'react'

function useLocalStorage(itemName, initialValue)
{
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try
      {
        const localStorageItem = localStorage.getItem(itemName)
  
        let parsedItem;
  
        if(!localStorageItem){
          localStorage.setItem(itemName,JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else { 
          parsedItem = JSON.parse(localStorageItem);
        }
  
        setItem(parsedItem)
        setLoading(false)
      }
      catch(error)
      {
        setLoading(false)
        setError(true)
      }
    }, 1000)
  })

  const saveItem = (newItem) => {
    setItem(newItem)
    localStorage.setItem(itemName, JSON.stringify(newItem))
  }

  return {item, saveItem, loading, error}
}

export {useLocalStorage}