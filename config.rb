###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  # blog.prefix = "blog"
  blog.sources = "blog/:title.html"
  # blog.permalink = ":year/:month/:day/:title"
  # blog.sources = ":year-:month-:day-:title.html"
  # blog.taglink = "tags/:tag.html"
  # blog.layout = "layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = ":year.html"
  # blog.month_link = ":year/:month.html"
  # blog.day_link = ":year/:month/:day.html"
  # blog.default_extension = ".markdown"

  blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/:num"
end

page "/feed.xml", :layout => false
page "blog/*", :layout => :post_layout


### 
# Compass
###

# Susy grids in Compass
# First: gem install susy
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
# 
# With no layout
# page "/path/to/file.html", :layout => false
# 
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
# 
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :fonts_dir, 'fonts'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css
  
  # Minify Javascript on build
  # activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end

activate :livereload

activate :directory_indexes

activate :syntax#,:linenos => 'table'

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

helpers do
  def div(css_class, content)
    %Q{<div class="#{css_class}">#{content}</div>}
  end
  def caption(content)
    %Q{<div class="caption">#{content}</div>}
  end
  def image(src, css_class)
    %Q{<img class="#{css_class}" src="/images/#{src}"/>}
  end
  def figure(src, caption="", css_class="", link="")
    if link != ""
      %Q{<figure class="#{css_class}"><a href="#{link}" target="_blank"><img src="/images/#{src}"/></a><figcaption>#{caption}</figcaption></figure>}
    else
      %Q{<figure class="#{css_class}"><img src="/images/#{src}"/><figcaption>#{caption}</figcaption></figure>}
    end
  end  
  def diagram(name, caption, css_class="")
    %Q{<figure class="diagram #{css_class}"><img src="/images/diagrams/#{name}@2x.png" alt="#{caption}"/><figcaption>#{caption}</figcaption></figure>}
  end
  def screenshot(name, caption, css_class="")
    %Q{<figure class="screenshot #{css_class}"><img src="/images/screenshots/#{name}.png" alt="#{caption}"/><figcaption>#{caption}</figcaption></figure>}
  end    
  def commit(name, caption)
    caption = truncate(caption, :length => 60)
    %Q{<div class="commit"><img src="/images/code.svg"/><div class="message"><h4>Commit #{name}</h4><p>#{caption}</p></div><div class="actions"><a class="commit-link" href="https://github.com/DiscoverMeteor/Microscope/commit/chapter#{name}" target="_blank">View on GitHub</a><a class="instance-link" href="http://meteor-book-chapter#{name}.meteor.com" target="_blank" class="live-instance">Launch Instance</a></div></div>}
  end  
  def scommit(name, caption)
    caption = truncate(caption, :length => 60)
    %Q{<div class="commit"><img src="/images/code.svg"/><div class="message"><h4>Commit #{name}</h4><p>#{caption}</p></div><div class="actions"><a class="commit-link" href="https://github.com/DiscoverMeteor/Microscope/commit/sidebar#{name}" target="_blank">View on GitHub</a><a class="instance-link" href="http://meteor-book-sidebar#{name}.meteor.com" target="_blank" class="live-instance">Launch Instance</a></div></div>}
  end    
  def highlight(lines, css_class="added")
    %Q{<div class="lines-highlight" data-lines="#{lines}" data-class="#{css_class}"></div>}
  end
  def pullquote(content, css_class="left")
    %Q{<blockquote class="pull pull-#{css_class}">#{content}</blockquote>}
  end        
  def note(&block)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :fenced_code_blocks => true)
    content = markdown.render(capture(&block))
    concat %Q{<div class="note">#{content}</div>}
  end
  def chapter(&block)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :fenced_code_blocks => true)
    content = markdown.render(capture(&block))
    concat %Q{<div class="note chapter"><h3>In this chapter, you will:</h3>#{content}</div>}
  end
end
