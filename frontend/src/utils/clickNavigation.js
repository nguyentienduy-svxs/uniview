export function allowsLabelRouteInference(target) {
  if (!target) return false

  // A `type="button"` control is an in-page application action. Its visible
  // copy may contain words such as "đăng ký" without being a navigation CTA.
  return !(target.tagName === 'BUTTON' && target.getAttribute('type') === 'button')
}
