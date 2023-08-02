import '../../assets/styles/Calendar.css';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Fragment, useCallback, useState } from 'react';
import Calendar from 'react-calendar';

import classNames from '../../utils/classNames';
import formatDate from '../../utils/formatDate';

function NextIcon() {
  return (
    <svg
      className="suivant"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="18"
      fill="none"
      viewBox="0 0 10 18"
    >
      <path
        stroke="#232020"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1.667 1.727L8.333 9l-6.666 7.273"
      ></path>
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="18"
      fill="none"
      viewBox="0 0 10 18"
    >
      <path
        stroke="#232020"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8.333 16.273L1.667 9l6.666-7.273"
      ></path>
    </svg>
  );
}

export default function CalendarBuilder({ onChange, currentDate, minDate }) {
  const [selected, setSelected] = useState(currentDate);
  const onChangeCallback = useCallback(onChange, [
    minDate,
    currentDate,
    onChange,
  ]);

  function onChangeDate(nextValue) {
    setSelected(nextValue);
    onChangeCallback(nextValue);
  }

  function reformatLabel(local, date) {
    const dayName = new Date(date).toLocaleString(local, { weekday: "short" });
    return dayName[0] + "" + dayName[1];
  }

  return (
    <>
      <Listbox
        key={selected}
        value={selected}
        onChange={setSelected}
        className=""
      >
        {({ open }) => (
          <>
            <div className="relative mt-1 w-[210px] ">
              <Listbox.Button
                className={classNames(
                  open && "rounded-b-none",
                  "relative w-full border-[#EDEDED] border text-left rounded-xl bg-white py-[14px] px-[10px] "
                )}
              >
                <span className="block truncate">
                  {formatDate(currentDate)}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  {!open ? (
                    <ChevronDownIcon
                      className="h-5 w-5 text-[#BFBFBF]"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronUpIcon
                      className="h-5 w-5 text-[#BFBFBF]"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 rounded-t-none max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <section className="absolute w-[230px] top-[-70px] left-[-15px]">
                    <Calendar
                      prevLabel={<PrevIcon />}
                      formatShortWeekday={reformatLabel}
                      nextLabel={<NextIcon />}
                      locale="en"
                      prev2Label={null}
                      next2Label={null}
                      onChange={onChangeDate}
                      value={currentDate}
                      minDate={minDate}
                    />
                  </section>
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
}
