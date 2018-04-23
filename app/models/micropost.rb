class Micropost < ApplicationRecord
    belongs_to :user
    scope :user_id, -> (user_id) { where user_id: user_id }
    # has_scope :by_user_id
    # scope :by_user_id, -> user_id { where(:user_id => user_id) }

    def index
        @microposts = Micropost.where(nil)
        puts "#!    HOLA!"
        @microposts = @microposts.user_id(params[:user_id]) if params[:user_id].present?
        # @products = Product.where(nil) # creates an anonymous scope
        # @products = @products.status(params[:status]) if params[:status].present?
        # @products = @products.location(params[:location]) if params[:location].present?
        # @products = @products.starts_with(params[:starts_with]) if params[:starts_with].present?
        render :index
    end

    # def index(user_id)
    #     logger.info "HOLA!"
    #     @microposts = Micropost
    # end

    def search

        @microposts = Micropost;
        render :template => "index"
    end


    # def by_user(user_id = 1)
    #     @microposts = Micropost.find(1);
    #     render :template => "index"
    # end
end
