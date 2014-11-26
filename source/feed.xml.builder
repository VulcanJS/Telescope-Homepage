---
blog: "blog"
---

xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  xml.title "Telescope Blog"
  xml.subtitle "Telescope Blog"
  xml.id "http://www.telesc.pe/blog"
  xml.link "href" => "http://www.telesc.pe/blog"
  xml.link "href" => "http://www.telesc.pe/blog/feed.xml", "rel" => "self"
  xml.updated blog.articles.first.date.to_time.iso8601
  xml.author { xml.name "Sacha Greif" }

  blog('blog').articles[0..15].each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => "http://www.telesc.pe/blog" + article.url
      xml.id article.url
      xml.published article.date.to_time.iso8601
      xml.updated article.date.to_time.iso8601
      xml.author { xml.name "Sacha Greif" }
      # xml.summary article.summary, "type" => "html"
      xml.content article.body, "type" => "html"
    end
  end
end