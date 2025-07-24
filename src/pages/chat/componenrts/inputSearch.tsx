import { Icons } from '../../../icons'
import './inputSearchStyle.css'

export function InputSearch() {
  return (
    <div className="search-wrapper">
        <div className='search-box'>
            <Icons.search />
            <input className='search-input' type="search" name="search" id="search" placeholder="Search" />
        </div>
    </div>
  )
}
