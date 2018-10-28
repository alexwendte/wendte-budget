// @flow

import * as React from 'react'
import { InputGroup } from 'styles/SC'

interface IProps {
  categories?: string[]
}

const CategoryInputGroup = ({ categories }: IProps) => (
  <InputGroup>
    <label htmlFor="category">Item Category</label>
    <select id="category" name="category" required={true}>
      {categories &&
        categories.map(cat => (
          <option value={cat} key={cat}>
            {cat}
          </option>
        ))}
    </select>
  </InputGroup>
)

export default CategoryInputGroup
