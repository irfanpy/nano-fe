import { MdWork, MdLanguage, MdSchool, MdCheckCircle } from 'react-icons/md'

export default function HelperAbout({ helper }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">About {helper.name?.split(' ')[0]}</h3>
      </div>
      <div className="card-body space-y-5">
        {/* Bio */}
        {helper.bio && (
          <p className="text-sm text-neutral-700 leading-relaxed">{helper.bio}</p>
        )}

        {/* Info grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <MdWork size={18} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-neutral-400 mb-0.5">Experience</p>
              <p className="text-sm font-medium text-navy-500">{helper.experience}+ years</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MdSchool size={18} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-neutral-400 mb-0.5">Education</p>
              <p className="text-sm font-medium text-navy-500">{helper.education ?? 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Languages */}
        {helper.languages?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MdLanguage size={16} className="text-primary-500" />
              <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Languages</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {helper.languages.map((lang) => (
                <span key={lang} className="badge-gray text-xs">{lang}</span>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {helper.skills?.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {helper.skills.map((skill) => (
                <span key={skill} className="flex items-center gap-1 badge-green text-xs">
                  <MdCheckCircle size={11} />{skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
