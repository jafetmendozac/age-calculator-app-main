import { useEffect, useState } from 'react'
import './App.css'
import IconArrow from './assets/IconArrow.jsx'

export function App() {
  const [age, setAge] = useState({
    day : '',
    month : '',
    year: ''
  })
  const [empty, setEmpty] = useState({
    day : false,
    month : false,
    year: false
  })
  const [valid, setValid] = useState({
    day: false,
    month: false,
    year: false
  })
  const [result, setResult] = useState({
    day : '',
    month : '',
    year: ''
  })

  useEffect(() => {
    setEmpty({day : false, month : false, year: false})
    setValid({day : false, month : false, year: false})
  }, [age])

  const handleInputDay = ({target}) => {
    const data = target.value

    setAge({...age, day: data})
  }

  const handleInputMonth = ({target}) => {
    const data = target.value

    setAge({...age, month: data})
  }

  const handleInputYear = ({target}) => {
    const data = target.value

    setAge({...age, year: data})
  }

  const calculateEmpty = () => {
    // Esta funcion evalua si esta vacio
    let emptyDay
    let emptyMonth
    let emptyYear

    if (age.day.length === 0) {
      emptyDay = true
    } else emptyDay = false
    if (age.month.length === 0) {
      emptyMonth = true
    } else emptyMonth = false
    if (age.year.length === 0) {
      emptyYear = true
    } else emptyYear = false

    setEmpty({
      day: emptyDay,
      month: emptyMonth,
      year: emptyYear
    })
  }

  const calculateValid = () => {
    // Calcula si la fecha esta en el pasado
    let validYear = false

    const currentYear = new Date().getFullYear()

    if (age.year > 0 && age.year <= currentYear) validYear = false
    else validYear = true

    let validMonth = false
    let validDay = false
    console.log('age.month', typeof age.month)

    switch (Number(age.month)) {
      case 1:
        Number(age.day) <= 31 ? validDay = false : validDay = true
        break
      case 2:
        const yearC = Number(age.year)
        if (((yearC % 4) === 0 && (yearC % 100) !== 0)
        || (yearC % 400) === 0) {
          age.day <= 29 ? validDay = false : validDay = true
        } else Number(age.day) <= 28 ? validDay = false : validDay = true
        break
      case 3:
        Number(age.day) <= 31 ? validDay = false : validDay = true
        break
      case 4:
        Number(age.day) <= 30 ? validDay = false : validDay = true
        break
      case 5:
        Number(age.day) <= 31 ? validDay = false : validDay = true
        break
      case 6:
        Number(age.day) <= 30 ? validDay = false : validDay = true
        break
      case 7:
        Number(age.day) <= 31 ? validDay = false : validDay = true
        break
      case 8:
        Number(age.day) <= 31 ? validDay = false : validDay = true
        break
      case 9:
        Number(age.day) <= 30 ? validDay = false : validDay = true
        break
      case 10:
        Number(age.day) <= 31 ? validDay = false : validDay = true
        break
      case 11:
        Number(age.day) <= 30 ? validDay = false : validDay = true
        break
      case 12:
        Number(age.day) <= 31 ? validDay = false : validDay = true
        break
      default:
        validDay = true
        validMonth = true
        break
    }

    setValid({
      day: validDay,
      month: validMonth,
      year: validYear
    })
  }

  const answer = () => {
    // Esta funcion calcula la edad

    const born = new Date(age.year, age.month - 1, age.day).getTime()
    const date = Date.now()

    const difference = date - born
    const time = new Date(difference)
    const responYear = Math.abs(time.getUTCFullYear() - 1970)
    const responMonth = Math.abs(time.getUTCMonth())
    const responDay = Math.abs(time.getDate())

    setResult({
      day: responDay,
      month: responMonth,
      year: responYear
    })
  }

  console.log('empty', empty)
  console.log('valid', valid)
  console.log(age)

  return (
    <main>
      <section>
        <form
          onSubmit={ev => {
            ev.preventDefault()
            if (age.day.length === 0 ||
            age.day.length === 0 ||
            age.day.length === 0) {
              calculateEmpty()
            } else calculateValid()
            answer()
          }}
        >
          <div className='wrapped-inputs'>
            <div>
              <span className={empty.day || valid.day ? 'name-input nameInputError ' : 'name-input'}>DAY</span>
              <input
                className={empty.day || valid.day ? 'input-age-error' : ''}
                type='text'
                minLength='0'
                maxLength='2'
                placeholder='DD'
                autoComplete='off'
                name='day'
                value={age.day}
                onChange={handleInputDay}
              />
              { empty.day && <span className='show-error'>This field is required</span> }
              { valid.day && <span className='show-error'>Must be a valid day</span> }
            </div>
            <div>
              <span className={empty.month || valid.month ? 'name-input nameInputError ' : 'name-input'}>MONTH</span>
              <input
                className={empty.month || valid.month ? 'input-age-error' : ''}
                type='text'
                minLength='0'
                maxLength='2'
                placeholder='MM'
                autoComplete='off'
                name='month'
                value={age.month}
                onChange={handleInputMonth}
              />
              { empty.month && <span className='show-error'>This field is required</span> }
              { valid.month && <span className='show-error'>Must be a valid month</span> }
            </div>
            <div>
              <span className={empty.year || valid.year ? 'name-input nameInputError ' : 'name-input'}>YEAR</span>
              <input
                className={empty.year || valid.year ? 'input-age-error' : ''}
                type='text'
                minLength='0'
                maxLength='4'
                placeholder='YYYY'
                autoComplete='off'
                name='year'
                value={age.year}
                onChange={handleInputYear}
              />
              { empty.year && <span className='show-error'>This field is required</span> }
              { valid.year && <span className='show-error'>Must be in the past</span> }
            </div>
          </div>
          <div className='separate'>
            <div className='line' />
            <button
              type='submit'
              className='circle-icon'
            >
              <IconArrow /> {/* el circulo debe der un button entonces tambien tendria que hacer un form ??? y tambien va a ser un formulario no controlado */}
            </button>
          </div>
        </form>
        {
          (result.day.length !== 0 || result.month.length !== 0 || result.year.length !== 0) ? (
            <div className='wrapped-age'>
              <p><span>{age.year.length === 0 ? '- - ' : result.year + ' ' }</span>years</p>
              <p><span>{age.month.length === 0 ? '- - ' : result.month + ' ' }</span>months</p>
              <p><span>{age.day.length === 0 ? '- - ' : result.day + ' ' }</span>days</p>
            </div>
          ) : (
            <div className='wrapped-age'>
              <p><span>- - </span>years</p>
              <p><span>- - </span>months</p>
              <p><span>- - </span>days</p>
            </div>
          )
        }
      </section>
    </main>
  )
}
