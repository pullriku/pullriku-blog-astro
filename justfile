# コマンドの一覧を表示する
help:
    just --list

# Git Subtreeの内容をpullする
pull-subtree:
    just _check-is-draft-branch
    git subtree pull --prefix=src/contents https://github.com/pullriku/pullriku-blog-contents.git main --squash

# Git Subtreeの内容をpushする
push-subtree:
    just _check-is-draft-branch
    git subtree push --prefix=src/contents https://github.com/pullriku/pullriku-blog-contents.git main

# 新しい記事を作成する
new-article slug:
    just _check-is-draft-branch
    cp ./template.mdx src/contents/posts/{{slug}}.mdx
    mkdir -p src/contents/images/posts/{{slug}}

# 記事を削除する
remove-article slug:
    just _check-is-draft-branch
    rm src/contents/posts/{{slug}}.mdx
    rm -rf src/contents/images/posts/{{slug}}

# 現在のブランチがdraftかを確認する
_check-is-draft-branch:
    sh scripts/check_is_draft_br.sh
