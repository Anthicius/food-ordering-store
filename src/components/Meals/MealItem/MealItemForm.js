import React from 'react'
import classes from "./MealItemForm.module.css"

const MealItemForm = () => {
  return (
    <form className={classes.form}>
        <label htmlFor='Amount'/>
        <input 
            id='Amount'
            type='number'
            min='1'
            max='10'
            step='1'
            defaultValue='1'
        />
        <button>+ Add</button>
    </form>
  )
}

export default MealItemForm