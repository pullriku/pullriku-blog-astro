# 現在のブランチ名を取得
current_branch=$(git symbolic-ref --short HEAD)

if [ "$current_branch" != "draft" ]; then
  echo "🛑 エラー: 現在のブランチは 'draft' ではありません（現在: ${current_branch}）"
  exit 1
fi

exit 0
