export default function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Insights & News from Our Blog</h2>
          <p className="text-gray-600 mb-8">
            Our latest news and articles are available at our dedicated blog.
          </p>
          <a 
            href="https://blog.remax-blueocean.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Visit blog.remax-blueocean.com
          </a>
        </div>
      </div>
    </section>
  );
}
