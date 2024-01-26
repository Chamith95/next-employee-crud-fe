import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employeee',
  initialState: {
    employees: []
  },
  reducers: {
    populateEmployees: (state, action) => {
      state.employees = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { populateEmployees } = employeeSlice.actions

export default employeeSlice.reducer