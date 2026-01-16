function PageHeader({ title }) {
  return (
    <header>
      {/* Page-level heading: defines the primary context of the page */}
      <h1 className="text-5xl font-bold text-sky-500">{title}</h1>
    </header>
  );
}

export default PageHeader;
