const skills = [
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'TailwindCSS', level: 85 },
  { name: 'Git', level: 80 },
];

export default function Skills() {
  return (
    <section className="py-20 bg-gray-50" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{skill.name}</h3>
                <span className="text-blue-600">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 