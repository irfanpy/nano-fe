import { useState, useRef } from 'react'
import { MdGavel, MdCheckCircle } from 'react-icons/md'

export default function ContractViewer({ contract, onSign }) {
  const [scrolled, setScrolled] = useState(false)
  const [agreed,   setAgreed]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [signed,   setSigned]   = useState(contract?.signed ?? false)
  const bodyRef = useRef(null)

  const handleScroll = () => {
    const el = bodyRef.current
    if (!el) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) setScrolled(true)
  }

  const handleSign = () => {
    if (!agreed) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSigned(true); onSign?.() }, 900)
  }

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="card-header flex items-center gap-3">
        <MdGavel size={20} className="text-primary-500" />
        <div>
          <h3 className="font-condensed font-bold text-navy-500 text-lg">Employment Contract</h3>
          <p className="text-xs text-neutral-400">{contract?.id ?? 'CTR-2024-001'} · Draft</p>
        </div>
        {signed && <span className="badge-green text-xs ml-auto flex items-center gap-1"><MdCheckCircle size={12} /> Signed</span>}
      </div>

      {/* Scrollable contract body */}
      <div
        ref={bodyRef}
        onScroll={handleScroll}
        className="p-6 h-72 overflow-y-auto text-sm text-neutral-700 leading-relaxed space-y-4 border-b border-neutral-100"
      >
        <h4 className="font-semibold text-navy-500">DOMESTIC WORKER EMPLOYMENT CONTRACT</h4>
        <p>This Employment Contract ("Agreement") is entered into between the <strong>Employer</strong> (the Family) and the <strong>Employee</strong> (the Helper), collectively referred to as "the Parties".</p>
        <p><strong>1. Duration:</strong> This contract is for the period specified at the time of booking commencement, subject to renewal by mutual agreement.</p>
        <p><strong>2. Duties:</strong> The Employee agrees to perform all duties as assigned by the Employer including but not limited to household management, childcare, cooking, and driving as specified in the booking category.</p>
        <p><strong>3. Compensation:</strong> The Employer agrees to pay the Employee the agreed monthly salary as stated in the booking on or before the 1st of each calendar month.</p>
        <p><strong>4. Working Hours:</strong> Standard working hours shall not exceed 8 hours per day with one rest day per week. Overtime shall be compensated at 125% of the standard rate.</p>
        <p><strong>5. Accommodation:</strong> For Live-In arrangements, the Employer shall provide suitable accommodation and meals at no cost to the Employee.</p>
        <p><strong>6. Leave Entitlement:</strong> The Employee is entitled to 30 days paid annual leave and all UAE public holidays.</p>
        <p><strong>7. Termination:</strong> Either party may terminate this contract with 30 days written notice. In the event of early termination by the Employer without cause, the Employee shall be entitled to the remaining contract salary.</p>
        <p><strong>8. Governing Law:</strong> This agreement is governed by the laws of the United Arab Emirates and the MoHRE domestic worker regulations.</p>
        <p className="text-xs text-neutral-400 italic">Please scroll to the bottom and agree to the terms to sign this contract electronically.</p>
      </div>

      {/* Sign section */}
      {!signed ? (
        <div className="p-5 space-y-4">
          {!scrolled && (
            <p className="text-xs text-neutral-400 text-center">Please read the full contract before signing.</p>
          )}
          <label className={`flex items-start gap-3 cursor-pointer ${!scrolled ? 'opacity-50 pointer-events-none' : ''}`}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 accent-primary-500 w-4 h-4 flex-shrink-0" />
            <span className="text-sm text-neutral-700">I have read and agree to all terms and conditions of this contract.</span>
          </label>
          <button
            onClick={handleSign}
            disabled={!agreed || !scrolled || loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading
              ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Signing…</>
              : <><MdCheckCircle size={18} />Sign Contract Electronically</>
            }
          </button>
        </div>
      ) : (
        <div className="p-5 flex items-center gap-3 text-accent-600 bg-accent-50">
          <MdCheckCircle size={22} />
          <div>
            <p className="font-semibold text-sm">Contract signed successfully</p>
            <p className="text-xs text-accent-500">Signed on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      )}
    </div>
  )
}
