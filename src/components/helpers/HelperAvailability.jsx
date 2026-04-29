const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SLOTS = ['Morning\n6am–12pm', 'Afternoon\n12pm–6pm', 'Evening\n6pm–10pm']

export default function HelperAvailability({ schedule = {} }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Availability</h3>
      </div>
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left pr-3 py-2 text-neutral-400 font-medium w-24">Slot</th>
                {DAYS.map((d) => (
                  <th key={d} className="text-center py-2 text-neutral-500 font-medium">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {SLOTS.map((slot, si) => {
                const slotKey = ['morning', 'afternoon', 'evening'][si]
                return (
                  <tr key={slot}>
                    <td className="pr-3 py-2.5 text-neutral-500 whitespace-pre-line leading-tight text-[11px]">{slot}</td>
                    {DAYS.map((day) => {
                      const dayKey  = day.toLowerCase()
                      const avail   = schedule?.[dayKey]?.[slotKey] ?? false
                      return (
                        <td key={day} className="text-center py-2.5">
                          <span className={`inline-block w-6 h-6 rounded-lg mx-auto
                            ${avail ? 'bg-accent-100' : 'bg-neutral-100'}`}>
                            {avail && <span className="block w-2 h-2 rounded-full bg-accent-500 mx-auto mt-2" />}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-accent-100 inline-block" />Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-neutral-100 inline-block" />Unavailable
          </span>
        </div>
      </div>
    </div>
  )
}
