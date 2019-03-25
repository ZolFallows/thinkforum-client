import React from 'react'

import './Utils.css'


export function Input(props){
    return (
        <div className="Form_group">
            <label htmlFor={props.id}>{props.title}</label>
            <input className="Form_control" {...props} label={props.name}/>
        </div>
    )
}

export function SearchBar(props){
    return <input {...props}/>
}

export function Textarea({ className, ...props }) {
    return (
      <textarea className={['Textarea', className].join(' ')} {...props} />
    )
}

// export function NewQuestion(props){
//     return <button {...props}/>
// }

export function Button(props) {
    return <button {...props}>{props.title}</button>
}

export function Select(props){
    return (
        <div className="Form_group">
            <label htmlFor={props.id}>{props.title}</label>
            <select
                id={props.id}
                name={props.name}
                className="Form_control"
                defaultValue={props.placeholder}
            >
                <option defaultValue={props.placeholder} disabled>
                    {props.placeholder}
                </option>
                {props.options.map(option => {
                    return (
                        <option key={option} value={option} label={option}>
                            {option}
                        </option>
                        );
                    })
                }
            </select>
        </div>
    )
}

// export function Checkbox(props){
//     return (
//         <div className="form_group">
//             <label htmlFor={props.name}>
//                 {props.title}
//             </label>
//             <div className="checkbox">
//                 {props.options.map(option => {
//                     return (
//                     <label key={option} className="checkbox-inline">
//                         <input
//                         id={props.name}
//                         name={props.name}
//                         value={option}
//                         type="checkbox"
//                         />
//                         {option}
//                     </label>
//                     );
//                 })}
//             </div>
//         </div>
//     )
// }