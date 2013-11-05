# encoding: utf-8
 
require File.expand_path("../rack_try_static", __FILE__)
require File.expand_path("../rack_static_cache", __FILE__)

# use Rack::Auth::Basic, "Protected Area" do |username, password|
#   username == 'foo' && password == 'bar'
# end

use ::Rack::TryStatic,
  :root => "build",
  :urls => ["/"],
  :try  => [".html", "index.html", "/index.html"]
 
use Rack::StaticCache, :urls => ["/images", "/stylesheets", "/javascripts"], :root => "build"


run lambda { [404, {"Content-Type" => "text/plain"}, ["File not found!"]] }