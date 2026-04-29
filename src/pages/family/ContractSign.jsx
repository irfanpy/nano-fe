import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MdArrowBack, MdDownload, MdCheckCircle, MdLock, MdAssignment } from 'react-icons/md'

const CONTRACT = {
  id: 'C-2024-001',
  bookingId: 'B-2024-001',
  helper: { name: 'Maria Santos', category: 'Housemaid', nationality: 'Filipino' },
  family: 'Sarah Al-Mansouri',
  startDate: '15 January 2024',
  salary: 'AED 1,800 per month',
  duration: 'Open-ended (minimum 6 months)',
  signedAt: null,
  signedDate: null,
}

const CONTRACT_SECTIONS = [
  {
    title: '1. Parties to the Agreement',
    body: `This Domestic Employment Agreement ("Agreement") is entered into between Sarah Al-Mansouri ("Employer") and Maria Santos ("Employee"), facilitated through Trusted Home Helpers UAE ("Platform"). Both parties agree to the terms outlined herein in accordance with UAE Federal Law No. 10 of 2017 on Domestic Workers.`,
  },
  {
    title: '2. Scope of Services',
    body: `The Employee shall perform household duties including but not limited to: general cleaning, laundry and ironing, cooking (upon agreement), childcare assistance, grocery shopping, and pet care. All duties shall be performed to a professional standard and in accordance with the Employer's reasonable instructions.`,
  },
  {
    title: '3. Working Hours & Rest',
    body: `Standard working hours are 9 hours per day with a minimum of 1 hour rest period. The Employee is entitled to one full rest day per week (Friday) and 30 days of annual leave upon completion of one year of service. National and UAE public holidays apply as per UAE Labour Law.`,
  },
  {
    title: '4. Remuneration & Payment',
    body: `The agreed monthly salary is AED 1,800 payable on or before the 15th of each month via the Trusted Home Helpers escrow system. Late payments incur a 5% monthly penalty. All payments are traceable and compliant with the UAE Wages Protection System (WPS).`,
  },
  {
    title: '5. Accommodation & Meals',
    body: `The Employer shall provide suitable accommodation (private room), three meals per day or equivalent food allowance, and access to bathroom and laundry facilities at no cost to the Employee. Accommodation must meet UAE Domestic Worker welfare standards.`,
  },
  {
    title: '6. Visa & Residency',
    body: `The Employer shall sponsor the Employee's UAE residence visa under the domestic worker category and bear all associated costs including medical testing, Emirates ID, and visa fees. The Employee shall not be required to pay any recruitment or visa fees.`,
  },
  {
    title: '7. Termination',
    body: `Either party may terminate this agreement with 30 days written notice. In case of termination by the Employer without cause, the Employee is entitled to 14 days salary per year of service as end-of-service benefit. Serious misconduct may result in immediate termination subject to MoHRE adjudication.`,
  },
  {
    title: '8. Dispute Resolution',
    body: `Any disputes arising from this agreement shall first be mediated through the Trusted Home Helpers dispute resolution process. If unresolved, the matter shall be referred to the UAE Ministry of Human Resources & Emiratisation (MoHRE) for official adjudication in accordance with UAE law.`,
  },
]

export default function ContractSign() {
  const { id } = useParams()
  void id

  const [alreadySigned] = useState(false)
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [signed, setSigned] = useState(false)

  const canSign = check1 && check2 && !signed && !alreadySigned

  const handleSign = () => {
    if (!canSign) return
    setSigned(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-400">
        <Link to="/family" className="hover:text-navy-500 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to="/family/bookings" className="hover:text-navy-500 transition-colors">Bookings</Link>
        <span>/</span>
        <Link to={`/family/bookings/${CONTRACT.bookingId}`} className="hover:text-navy-500 transition-colors">#{CONTRACT.bookingId}</Link>
        <span>/</span>
        <span className="text-navy-500 font-medium">Contract</span>
      </nav>

      <div className="flex items-center gap-3">
        <Link to={`/family/bookings/${CONTRACT.bookingId}`} className="btn-ghost flex items-center gap-1.5 text-sm">
          <MdArrowBack size={16} /> Back
        </Link>
        <h2 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide flex items-center gap-2">
          <MdAssignment size={24} className="text-primary-500" /> Employment Contract
        </h2>
      </div>

      {(signed || alreadySigned) && (
        <div className="bg-accent-50 border border-accent-200 rounded-2xl px-5 py-4 flex items-center gap-3 animate-slide-up">
          <MdCheckCircle size={24} className="text-accent-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-accent-700">Contract Signed Successfully</p>
            <p className="text-sm text-accent-600">Signed on {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Contract Document */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            {/* Document header */}
            <div className="bg-navy-500 px-8 py-6 text-white text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center mx-auto mb-3 shadow-gold">
                <span className="font-condensed font-bold text-white text-lg">TH</span>
              </div>
              <h3 className="font-condensed font-bold text-xl tracking-widest uppercase">Domestic Employment Agreement</h3>
              <p className="text-neutral-400 text-xs mt-1 tracking-wider">Contract #{CONTRACT.id}</p>
            </div>

            {/* Parties summary */}
            <div className="bg-primary-50 border-b border-primary-100 px-8 py-4">
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div><span className="text-neutral-400 text-xs uppercase tracking-wider block mb-0.5">Employer</span><strong className="text-navy-500">{CONTRACT.family}</strong></div>
                <div><span className="text-neutral-400 text-xs uppercase tracking-wider block mb-0.5">Employee</span><strong className="text-navy-500">{CONTRACT.helper.name}</strong></div>
                <div><span className="text-neutral-400 text-xs uppercase tracking-wider block mb-0.5">Start Date</span><strong className="text-navy-500">{CONTRACT.startDate}</strong></div>
              </div>
            </div>

            {/* Contract body */}
            <div className="p-8 space-y-6 max-h-[520px] overflow-y-auto">
              {CONTRACT_SECTIONS.map(({ title, body }) => (
                <div key={title}>
                  <h4 className="font-condensed font-bold text-navy-500 text-base mb-2 tracking-wide">{title}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-400 leading-relaxed">
                This agreement is governed by UAE Federal Law No. 10 of 2017 on Domestic Workers and its executive regulations. Any amendment to this agreement must be made in writing and signed by both parties.
              </div>
            </div>
          </div>
        </div>

        {/* Sign Panel */}
        <div className="lg:sticky lg:top-24 space-y-4">
          {/* Summary */}
          <div className="card card-body space-y-3">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Contract Summary</h3>
            {[
              ['Helper',    CONTRACT.helper.name],
              ['Role',      CONTRACT.helper.category],
              ['Salary',    CONTRACT.salary],
              ['Duration',  CONTRACT.duration],
              ['Start',     CONTRACT.startDate],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm gap-2">
                <span className="text-neutral-400">{k}</span>
                <span className="font-medium text-navy-500 text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* Sign checks */}
          {!signed && !alreadySigned && (
            <div className="card card-body space-y-4">
              <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide flex items-center gap-2">
                <MdLock size={18} className="text-primary-500" /> Sign Contract
              </h3>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={check1} onChange={(e) => setCheck1(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-orange-500 flex-shrink-0" />
                <span className="text-sm text-neutral-600 leading-relaxed">
                  I have read and agree to all <strong>Terms and Conditions</strong> of this employment contract.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={check2} onChange={(e) => setCheck2(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-orange-500 flex-shrink-0" />
                <span className="text-sm text-neutral-600 leading-relaxed">
                  I confirm the <strong>payment details</strong> (AED 1,800/month) are correct and I authorise the escrow setup.
                </span>
              </label>

              <button onClick={handleSign} disabled={!canSign}
                className={`w-full justify-center py-3 font-condensed font-bold tracking-wider uppercase flex items-center gap-2 rounded-xl transition-all ${canSign ? 'bg-primary-500 text-white shadow-gold hover:bg-primary-600 active:scale-95' : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}`}>
                <MdCheckCircle size={18} /> Sign & Confirm
              </button>
            </div>
          )}

          {(signed || alreadySigned) && (
            <div className="card card-body text-center space-y-3">
              <MdCheckCircle size={36} className="text-accent-500 mx-auto" />
              <p className="font-semibold text-navy-500">Contract Signed!</p>
              <p className="text-sm text-neutral-500">Both parties have signed. A copy has been sent to your email.</p>
            </div>
          )}

          <button className="btn-ghost w-full flex items-center justify-center gap-2 border border-neutral-200 text-sm">
            <MdDownload size={16} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
