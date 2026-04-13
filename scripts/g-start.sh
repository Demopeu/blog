#!/bin/bash

echo "
██████╗ ███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║   ██║
██║  ██║█████╗  ██╔████╔██║██║   ██║██████╔╝█████╗  ██║   ██║
██║  ██║██╔══╝  ██║╚██╔╝██║██║   ██║██╔═══╝ ██╔══╝  ██║   ██║
██████╔╝███████╗██║ ╚═╝ ██║╚██████╔╝██║     ███████╗╚██████╔╝
╚═════╝ ╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚══════╝ ╚═════╝ 

🚀 [Task Start] 새로운 작업을 시작합니다...
"
echo "----------------------------------------"

# 1. 6개의 템플릿 매핑 데이터
templates=("✨ 기능 추가 (Feature)" "🐛 버그 수정 (Fix)" "🎨 디자인 변경 (Design)" "♻️ 리팩토링 (Refactor)" "📝 문서 수정 (Docs)" "🔧 기타/설정 (Chore)")
prefixes=("feat" "fix" "design" "refactor" "docs" "chore")
labels=("enhancement" "bug" "design" "refactor" "documentation" "chore")
title_prefixes=("[Feat]" "[Fix]" "[Design]" "[Refactor]" "[Docs]" "[Chore]")

# Y/N 확인용 공통 함수
confirm_step() {
  while true; do
    read -p "$1 (y/n): " yn
    case $yn in
      [Yy]* ) return 0;;
      [Nn]* ) echo "❌ 작업이 취소되었습니다."; exit 1;;
      * ) echo "⚠️ y 또는 n만 입력해주세요.";;
    esac
  done
}

# 메뉴 출력
for i in {1..6}; do
  echo "$i) ${templates[$i-1]}"
done
echo "----------------------------------------"

# 메뉴 선택 검증
while true; do
  read -p "👉 원하는 작업의 번호를 입력하세요 (1-6): " REPLY
  if [[ "$REPLY" -ge 1 && "$REPLY" -le 6 ]]; then
    idx=$((REPLY-1))
    break
  else
    echo "⚠️ 1에서 6 사이의 숫자를 입력해주세요."
  fi
done

echo "========================================"
echo "✅ [${templates[$idx]}] 선택 완료!"
echo "========================================"

confirm_step "🤔 이 카테고리로 작업을 진행할까요?"

# 2. 제목 입력 (공백/엔터 방지 무한 루프)
while true; do
  read -p "✏️ 이슈 제목 입력 (${title_prefixes[$idx]} 자동 추가): " user_title
  # 공백을 모두 제거했을 때 문자열이 비어있지 않은지 검사
  if [[ -n "${user_title// /}" ]]; then
    break
  else
    echo "❌ 제목은 비워두거나 띄어쓰기만 입력할 수 없습니다. 다시 적어주세요!"
  fi
done

# 3. 설명 입력
read -p "📝 작업 설명(1~2줄)을 입력하세요: " user_desc

full_title="${title_prefixes[$idx]} $user_title"

# 4. YAML 폼과 동일한 본문(Body) 자동 생성 함수
generate_body() {
  local desc="$1"
  case $idx in
    0) echo -e "### 💡 기능 설명\n$desc\n\n### ✅ 작업 상세 내용 (To-do)\n- [ ] \n- [ ] " ;;
    1) echo -e "### 🚨 버그 설명\n$desc\n\n### 🔄 재현 방법\n1. \n2. \n\n### 🖥️ 발생 환경 (브라우저)\n- Chrome" ;;
    2) echo -e "### 🎨 디자인 변경 사항\n$desc\n\n### ✅ 작업 상세 내용 (To-do)\n- [ ] " ;;
    3) echo -e "### ♻️ 리팩토링 목적 및 내용\n$desc\n\n### ✅ 작업 상세 내용 (To-do)\n- [ ] " ;;
    4) echo -e "### 📝 문서 수정 내용\n$desc" ;;
    5) echo -e "### 🔧 작업 내용\n$desc\n\n### ✅ 작업 상세 내용 (To-do)\n- [ ] " ;;
  esac
}

issue_body=$(generate_body "$user_desc")

echo "----------------------------------------"
echo -e "📄 [생성될 이슈 미리보기]\n- 제목: $full_title\n- 라벨: ${labels[$idx]}"
echo "----------------------------------------"

confirm_step "🚀 위 내용으로 깃허브에 이슈를 등록할까요?"

echo "⏳ 서버에 이슈 등록 중..."
gh issue create --title "$full_title" --body "$issue_body" --label "${labels[$idx]}" --assignee "@me"

# 이슈 번호 파싱 및 브랜치명 생성
issue_num=$(gh issue list --author "@me" --limit 1 --json number --jq '.[0].number')
current_branch=$(git rev-parse --abbrev-ref HEAD)
safe_title=$(echo "$user_title" | tr -s ' ' '-' | sed 's/[^a-zA-Z0-9가-힣-]//g')
branch_name="${prefixes[$idx]}/${issue_num}-${safe_title}"

echo "----------------------------------------"
echo "🌱 생성될 브랜치: $branch_name"
confirm_step "📂 브랜치를 생성하고 바로 작업실로 이동할까요?"

gh issue develop "$issue_num" --name "$branch_name" --base "$current_branch" --checkout
echo "🎉 세팅 완료! 코딩을 시작하세요!"