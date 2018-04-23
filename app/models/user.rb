class User < ApplicationRecord
    has_many :micropost
    
    def microposts
        
        render :template => "index"
    end
end
