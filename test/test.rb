# -*- coding: utf-8 -*-
require 'rubygems'
require 'sinatra'
require 'json'

configure do
end

before do
  sleep 1
end

get '/' do
  erb :index
end

# returns an html list of famous french women
get '/french_women' do
  @women = ["Joan of Arc", "Marie Antoinette", "Coco Chanel", 
            "Brigitte Bardot", "Marie Curie"]
  erb :"_french_women"
end

# create a fake french woman
post '/create' do
  %Q{You submitted the french food "#{params["food"]["name"]}"}
end

# returns the heights of different people
get '/heights' do
  content_type :json
  @heights = { "Adèle" => 150, "Marie" => 155, "Susanne" => 155, 
               "Véronique" => 150, "Isabelle" => 152, "Claire" => 156 }
  @heights.to_json
end
