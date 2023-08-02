import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import classNames from '../../utils/classNames'

export default function Select({ items, onChange, label, defaultIndex }) {
  const [selected, setSelected] = useState(items[defaultIndex])

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])

  return (
    <Listbox value={selected} onChange={setSelected} className="">
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          <div className="relative mt-1 w-[210px] ">
            <Listbox.Button className={classNames(
              open && "rounded-b-none",
              "relative w-full border-[#EDEDED] border text-left rounded-xl bg-white py-[14px] px-[10px] "
            )}>
              <span className={"block truncate" + (open ? ' font-bold' : '')}>{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {
                  !open ?
                    <ChevronDownIcon className="h-5 w-5 text-[#BFBFBF]" aria-hidden="true" /> :
                    <ChevronUpIcon className="h-5 w-5 text-[#BFBFBF]" aria-hidden="true" />
                }
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 rounded-t-none max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? ' text-primary' : 'text-gray-900',
                        'relative cursor-default select-none pl-3 pr-9 border-b border-[#E9E9E9] last:border-b-0 py-4'
                      )
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span className={classNames(selected ? 'text-primary' : 'font-normal', 'block truncate')}>
                          {item.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}