export default function PaymentSummary({ booking = {} }) {
  const salary      = booking.salary      ?? 0
  const placementFee = booking.placementFee ?? 500
  const commission  = Math.round(salary * 0.10)
  const vat         = Math.round((salary + placementFee + commission) * 0.05)
  const total       = salary + placementFee + commission + vat

  const rows = [
    { label: 'Monthly Salary',   amount: salary,       note: null },
    { label: 'Placement Fee',    amount: placementFee, note: 'One-time' },
    { label: 'Platform Fee (10%)', amount: commission,  note: null },
    { label: 'VAT (5%)',         amount: vat,           note: null },
  ]

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Payment Summary</h3>
      </div>
      <div className="card-body space-y-0">
        <div className="divide-y divide-neutral-50">
          {rows.map(({ label, amount, note }) => (
            <div key={label} className="flex items-center justify-between py-3">
              <span className="text-sm text-neutral-600">
                {label}
                {note && <span className="ml-1.5 badge-gray text-[10px]">{note}</span>}
              </span>
              <span className="text-sm font-medium text-navy-500">AED {amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-2">
          <span className="font-condensed font-bold text-navy-500 text-lg">Total Due</span>
          <span className="font-condensed font-bold text-primary-500 text-2xl">AED {total.toLocaleString()}</span>
        </div>
        <p className="text-xs text-neutral-400 mt-2">* Monthly salary recurs each month. Placement fee and VAT are charged once.</p>
      </div>
    </div>
  )
}
