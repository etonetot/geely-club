<template>
    <ol class="breadcrumb" v-if="items.length">
        <template v-for="(crumb, i) in items">
            <li :key="i+1">
                <router-link active-class="active" 
                    :to="{ path: crumb.path }" 
                    :tag="i != items.length-1 ? 'a' : lastTag"
                >
                    {{ crumb.title }}
                </router-link>
            </li>
            <li :key="-i" v-if="i != items.length-1" v-html="delimiter"></li>
        </template>
    </ol>
</template>

<script>

  export default {
    data() {
      return {
          delimiter: "&raquo;",
          lastTag: "a",  // "span"
      }
    },

    computed: {
        items() {
            return this.getItems();
        },
  
    },

    methods: {
        getBreadcrumb: function (routeRec) {
          let bc = routeRec.components ? routeRec.components.default.breadcrumb : undefined;   
          if (!bc)
           bc = routeRec.meta.breadcrumb; 

          if (!bc)  
            return;

          if (typeof bc === 'string')
            return { title: bc };

          if ( typeof bc === 'function' )
            bc = bc.call(this, this.$route.params);
          
          if (typeof bc === 'string')
            return { title: bc };
          return bc;  
        },

        getItems: function () {
            const breadcrumbs = [];
            
            this.$route.matched.forEach(routeRecord => {
                //console.log("routeRecord", routeRecord);
                
                let breadcrumb = this.getBreadcrumb( routeRecord );
                //console.log("breadcrumb", breadcrumb);
                if (!breadcrumb)
                    return;
                
                let path = routeRecord.path.length > 0 ? routeRecord.path : '/';
                path = this.resolveParams(path);
                let title = breadcrumb.title;  

                const breadcrumbsParent = [];
                while (breadcrumb && breadcrumb.parent)
                {
                    //console.log("breadcrumb.parent", breadcrumb.parent)
                    if (typeof breadcrumb.parent=='object')
                    {
                            breadcrumbsParent.unshift({
                                path: breadcrumb.parent.path,
                                title: breadcrumb.parent.title
                            });
                            breadcrumb = breadcrumb.parent;
                    }
                    else
                    {
                        let parentRoute = this.$router.resolve(breadcrumb.parent);
                        if (parentRoute)
                        {
                            let parent = this.getBreadcrumb(parentRoute.route);
                           
                            breadcrumbsParent.unshift({
                                path: this.resolveParams(parentRoute.route.path),
                                title: parent.title
                            });
                            breadcrumb = parent.parent //? this.$router.resolve(titleParent.parent): 0;
                        }
                    }
                }

                breadcrumbs.push(...breadcrumbsParent)
                breadcrumbs.push({title, path})

            }, this);

            return breadcrumbs;
        },
 
        resolveParams: function(path){
                Object.keys(this.$route.params).forEach(param => {
                     path = path.replace(':' + param, this.$route.params[param] ? this.$route.params[param] : "");
                 }, this);
                path = path.replace(':page', "");
                return path;
        }


    },

  }
</script>


<style>

.breadcrumb 
{
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
}

.breadcrumb li
{
    display: inline-flex;
    list-style-type: none;
}

.breadcrumb li:nth-child(2n) 
{
    padding: 0 8px;
}

.breadcrumb a
{
   text-decoration: none;
}
</style>
