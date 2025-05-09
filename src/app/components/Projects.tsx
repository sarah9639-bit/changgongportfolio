const projects = [
  {
    title: '포트폴리오 웹사이트',
    description: 'Next.js와 TailwindCSS를 사용하여 제작한 반응형 포트폴리오 웹사이트입니다.',
    tech: ['Next.js', 'React', 'TailwindCSS'],
    image: '/projects/portfolio.jpg',
    link: '#'
  },
  {
    title: '쇼핑몰 프로젝트',
    description: '온라인 쇼핑몰 플랫폼으로, 사용자 인증, 상품 관리, 장바구니 기능을 구현했습니다.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: '/projects/shop.jpg',
    link: '#'
  },
  {
    title: '일정 관리 앱',
    description: '할 일 관리와 일정 조율을 위한 웹 애플리케이션입니다.',
    tech: ['TypeScript', 'React', 'Firebase'],
    image: '/projects/todo.jpg',
    link: '#'
  }
];

export default function Projects() {
  return (
    <section className="py-20 bg-white" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                {/* 이미지가 있을 경우 추가 */}
                {/* <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 