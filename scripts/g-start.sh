#!/bin/bash
# GitHub Issue & Branch Automation

echo "🚀 로컬 작업 메뉴판을 불러옵니다..."
echo "----------------------------------------"

templates=("✨ 기능 추가 (Feature)" "🐛 버그 수정 (Fix)" "🎨 디자인 변경 (Design)" "♻️ 리팩토링 (Refactor)" "📝 문서 수정 (Docs)" "🔧 기타/설정 (Chore)" "❌ 취소")
prefixes=("feat" "fix" "design" "refactor" "docs" "chore")
labels=("enhancement" "bug" "design" "refactor" "documentation" "chore")
title_prefixes=("[Feat]" "[Fix]" "[Design]" "[Refactor]" "[Docs]" "[Chore]")

for i in {1..7}; do
  echo "$i) ${templates[$i-1]}"
done

echo "----------------------------------------"
read -p "👉 원하는 작업의 번호를 입력하고 Enter를 치세요: " REPLY

if [[ "$REPLY" == "7" ]]; then
  echo "취소되었습니다."
  exit 1
elif [[ "$REPLY" -ge 1 && "$REPLY" -le 6 ]]; then
  idx=$((REPLY-1))
  selected_prefix="${prefixes[$idx]}"
  selected_label="${labels[$idx]}"
  selected_title_prefix="${title_prefixes[$idx]}"
  opt="${templates[$idx]}"

  echo "========================================"
  echo "✅ [$opt] 선택 완료!"
  echo "========================================"

  read -p "✏️ 이슈 제목을 입력하세요 ($selected_title_prefix 자동 추가됨): " user_title
  if [[ -z "$user_title" ]]; then
    echo "❌ 제목이 비어있어 취소합니다."
    exit 1
  fi

  read -p "📝 작업 내용을 간단히 입력하세요: " user_body
  full_title="$selected_title_prefix $user_title"

  echo "⏳ 이슈를 서버에 등록하는 중입니다..."
  gh issue create --title "$full_title" --body "$user_body" --label "$selected_label" --assignee "@me"
  
  issue_num=$(gh issue list --author "@me" --limit 1 --json number --jq '.[0].number')
  
  if [[ -z "$issue_num" ]]; then
    echo "❌ 이슈 생성에 실패했습니다."
    exit 1
  fi

  current_branch=$(git rev-parse --abbrev-ref HEAD)
  safe_title=$(echo "$user_title" | tr -s ' ' '-' | sed 's/[^a-zA-Z0-9가-힣-]//g')
  branch_name="${selected_prefix}/${issue_num}-${safe_title}"

  echo "🌱 '$current_branch'를 기준으로 브랜치를 생성합니다: $branch_name"
  gh issue develop "$issue_num" --name "$branch_name" --base "$current_branch" --checkout
else
  echo "❌ 잘못된 번호입니다. 1~7 사이의 숫자를 입력해주세요."
  exit 1
fi