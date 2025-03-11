help:
    just --list

new-article slug:
    cp ./template.mdx src/content/posts/{{slug}}.mdx
    mkdir -p src/assets/images/posts/{{slug}}

remove-article slug:
    rm src/content/posts/{{slug}}.mdx
    rm -rf src/assets/images/posts/{{slug}}
